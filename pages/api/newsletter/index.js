import { connectDB, insertEmail } from '../../../helpers/mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    // 서버 측에서도 userEmail에 대한 유효성 검사 로직을 추가할 수 있다
    // => 프론트엔드 측의 유효성 검사를 회피한 경우에 대비할 수 있다
    if (!userEmail || !userEmail.includes('@')) {
      // 422 code: invalid input
      res.status(422).json({ message: 'invaild email input' })
      return
    }

    let client
    try {
      client = await connectDB()
    } catch (error) {
      res.status(500).json({ message: 'connecting database failed', error })
      return
    }

    try {
      await insertEmail(client, userEmail)
    } catch (error) {
      res.status(500).json({ message: 'inserting email failed', error })
      return
    }

    client?.close()

    res.status(201).json({
      message: 'success adding the register email',
      newEmail: userEmail,
    })
  }
}
