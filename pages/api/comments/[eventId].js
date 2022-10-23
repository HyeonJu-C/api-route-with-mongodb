import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.mongodb)

// post
async function addComment(newComment) {
  await client.connect()
  const db = client.db('events')
  const collection = db.collection('comments')
  const result = await collection.insertOne(newComment)

  newComment.id = result.insertedId // 클라이언트 측에서도 id를 확인할 수 있다.
  client.close()
}

// get
async function getCommentsByEventId(eventId) {
  await client.connect()
  const db = client.db('events')
  const collection = db.collection('comments')
  // find({}) => find all documents
  // sort({_id: -1}) => id 내림차 순으로 정렬 === 최신 데이터 순으로 정렬
  const result = await collection.find({ eventId }).toArray()
  client.close()
  return result
}

export default async function handler(req, res) {
  const { email, name, text } = req.body
  const { eventId } = req.query

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
      await addComment(newData)
      res.status(201).json({ message: 'success adding new comment', newData })

      break

    default:
      const comments = await getCommentsByEventId(eventId)
      res.status(200).json({ comments })
      break
  }
}
