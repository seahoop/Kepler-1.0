import { handler } from '../src/main'

async function run() {
  console.log('--- Test: NO Authorization header ---')
  await handler({
    headers: {}
  })

  console.log('--- Test: WITH Authorization header ---')
  await handler({
    headers: {
      Authorization: 'fake-token'
    }
  })
}

run().catch(err => {
  console.error(err)
})
