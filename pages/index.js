import Link from 'next/link'


export default function Home() {
  return (
    <>
      <div>
        <h1>Hello Worldaa</h1>
        <Link href="/products/create">Create Product</Link>
      </div>
    </>
  )
}
