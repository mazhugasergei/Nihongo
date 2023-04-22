// next
import Link from "next/link"

export default () => {
  return (
    <main>
      <div style={{ padding: "1rem" }}>
        <Link href="/test/1" className="btn">Test 1</Link>
      </div>
    </main>
  )
}