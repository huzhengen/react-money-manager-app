import type { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { ajax } from '../lib/ajax'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const nav = useNavigate()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const error = validate(data, [
      { key: 'email', type: 'required', message: 'Please input your email' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: 'The email is incorrect' },
      { key: 'code', type: 'required', message: 'Please input your code' },
      { key: 'code', type: 'length', min: 6, max: 6, message: 'The code is incorrect' },
    ])
    setError(error)
    if (hasError(error)) {
      await ajax.post('/api/v1/sign_in', data)
      nav('/home')
    }
  }
  return (<div>
    <Gradient>
      <TopNav title='Sign In' icon={<Icon name="back" onClick={() => { }} />} />
    </Gradient>
    <div text-center pt-40px pb-16px>
      <Icon name="logo" className='w-64px h-68px' />
      <h1 text-32px text="#7878FF" font-bold>Money Manager</h1>
    </div>
    <form j-form onSubmit={onSubmit}>
      <div>
        <span j-form-label>Email {error.email?.[0] && <span text-red>{error.email[0]}</span>}</span>
        <input j-input-text type="text" placeholder='Email'
          value={data.email} onChange={e => setData({ email: e.target.value })} />
      </div>
      <div>
        <span j-form-label>Code {error.code?.[0] && <span text-red>{error.code[0]}</span>}</span>
        <div flex gap-x-16px>
          <input j-input-text type="text" placeholder='Enter 6-digit code'
            value={data.code} onChange={e => setData({ code: e.target.value })} />
          <button j-btn>Send Code</button>
        </div>
      </div>
      <div mt-100px>
        <button j-btn type="submit">Sign In</button>
      </div>
    </form>
  </div>)
}
