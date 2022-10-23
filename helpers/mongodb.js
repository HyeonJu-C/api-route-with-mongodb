import { MongoClient } from 'mongodb'

export async function connectDB() {
  const client = new MongoClient(process.env.mongodb)
  await client.connect()
  return client
}

export async function insertEmail(client, email) {
  const db = client.db('events')
  const collection = db.collection('newsletters')
  // newsletters 컬렉션에 데이터를 추가한다.
  // => 이 때 데이터를 document라고 하고, document는 객체 타입이어야 한다.
  const result = await collection.insertOne({ email })
  client.close()

  return result
}

export async function insertComment(client, newComment) {
  const db = client.db('events')
  const collection = db.collection('comments')
  const result = await collection.insertOne(newComment)
  newComment.id = result.insertedId // 클라이언트 측에서도 id를 확인할 수 있다.
  client.close()

  return result
}

export async function getCommentsByEventId(client, eventId) {
  const db = client.db('events')
  const collection = db.collection('comments')
  // find({}) => find all documents
  // sort({_id: -1}) => id 내림차 순으로 정렬 === 최신 데이터 순으로 정렬
  const result = await collection.find({ eventId }).toArray()
  client.close()

  return result
}
