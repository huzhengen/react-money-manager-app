import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'
import { ajax } from '../lib/ajax'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'

const onSubmitError = (err: AxiosError) => {
  throw err
}

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const nav = useNavigate()
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'email', type: 'required', message: 'Please input your email' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: 'The email is incorrect' },
      { key: 'code', type: 'required', message: 'Please input your code' },
      { key: 'code', type: 'length', min: 6, max: 6, message: 'The code is incorrect' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      const response = await ajax.post<{ jwt: string }>('/api/v1/sign_in', data)
        .catch(onSubmitError)
      localStorage.setItem('jwt', response.data.jwt)
      nav('/home')
    }
  }
  const sendCode = async () => {
    const newError = validate({ email: data.email }, [
      { key: 'email', type: 'required', message: 'Please input your email' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: 'The email is incorrect' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      return await ajax.post('/api/v1/validation_code', { email: data.email })
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
      <Input label='Email' value={data.email} placeholder='Email' type="text"
        onChange={value => setData({ email: value })} error={error.email?.[0]} />
      <span text-gray text-13px>You can sign in using the default verification code 123456</span>
      <Input label='Code' value={data.code} placeholder='Enter 6-digit code' type='sms_code'
        onChange={value => setData({ code: value })} error={error.code?.[0]}
        request={sendCode} />
      <div mt-100px>
        <button j-btn type="submit">Sign In</button>
      </div>
    </form>
  </div>)
}
