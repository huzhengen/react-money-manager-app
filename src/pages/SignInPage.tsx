import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    setError(err.response?.data.errors ?? {})
    throw err
  }
  const { post: postWithLoading } = useAjax({ showLoading: true })
  const { post: postWithoutLoading } = useAjax({ showLoading: false })
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
      // Sign in
      const response = await postWithoutLoading<{ jwt: string }>('/api/v1/session', data)
        .catch(onSubmitError)
      // Putting jwt into localstorage
      localStorage.setItem('jwt', response.data.jwt)
      const from = searchParams.get('from') || '/items'
      nav(from)
    }
  }

  const sendCode = async () => {
    const newError = validate({ email: data.email }, [
      { key: 'email', type: 'required', message: 'Please input your email' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: 'The email is incorrect' },
    ])
    setError(newError)
    if (hasError(newError)) { throw new Error('Form error') }
    const response = await postWithLoading('/api/v1/validation_codes', {
      email: data.email
    })
    return response
  }
  return (<div>
    <Gradient>
      <TopNav title='Sign In' icon={<BackIcon />} />
    </Gradient>
    <div text-center pt-40px pb-16px>
      <Icon name="logo" className='w-64px h-68px' />
      <h1 text-32px text="#7878FF" font-bold>Money Manager</h1>
    </div>
    <form j-form onSubmit={onSubmit}>
      <span text-gray text-13px>Test Account: test@test.com</span>
      <Input label='Email' value={data.email} placeholder='Email' type="text"
        onChange={value => setData({ email: value })} error={error.email?.[0]} />
      <span text-gray text-13px>Test Verification Code: 123456</span>
      <Input label='Code' value={data.code} placeholder='Enter 6-digit code' type='sms_code'
        onChange={value => setData({ code: value })} error={error.code?.[0]}
        request={sendCode} />
      <div mt-100px>
        <button j-btn type="submit">Sign In</button>
      </div>
    </form>
  </div>)
}
