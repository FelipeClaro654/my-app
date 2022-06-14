import { AuthContext } from 'contexts/AuthContext'
import type { NextPage } from 'next'
import { FormEvent, useContext, useState } from 'react'

import styles from 'styles/index.module.scss'

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const data = { email, password }
    await signIn(data)
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button type="submit">Entrar</button>
    </form>
  )
}

export default Home
