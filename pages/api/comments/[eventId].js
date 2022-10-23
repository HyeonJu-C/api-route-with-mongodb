import {
  connectDB,
  getCommentsByEventId,
  insertComment,
} from '../../../helpers/mongodb'

export default async function handler(req, res) {
  const { email, name, text } = req.body
  const { eventId } = req.query
  let client
  try {
    client = await connectDB()
  } catch (error) {
    res.status(500).json({ message: 'connecting db failed.', error })
    return
  }

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
      try {
        await insertComment(client, newData)
      } catch (error) {
        res.status(500).json({ message: 'inserting comment failed.', error })
        return
      }
      client?.close()
      res.status(201).json({ message: 'success adding new comment', newData })

      break

    default:
      const comments = await getCommentsByEventId(client, eventId)
      res.status(200).json({ comments })
      break
  }
}
