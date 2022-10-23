import {
  connectDB,
  getCommentsByEventId,
  insertComment,
} from '../../../helpers/mongodb'

export default async function handler(req, res) {
  const { email, name, text } = req.body
  const { eventId } = req.query
  const client = await connectDB()

  switch (req.method) {
    // 서버 측에도 유효성 검사 로직을 추가할 수 있다.
    case 'POST':
      if (
        !email ||
        email.trim() === '' ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'invalid comment' })
        return
      }
      const newData = {
        email,
        name,
        text,
        eventId,
      }
      await insertComment(client, newData)
      res.status(201).json({ message: 'success adding new comment', newData })

      break

    default:
      const comments = await getCommentsByEventId(client, eventId)
      res.status(200).json({ comments })
      break
  }
}
