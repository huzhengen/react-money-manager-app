import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'
import { BackIcon } from '../components/BackIcon'

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
      // 登录
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
      <TopNav title='登录' icon={<BackIcon />} />
    </Gradient>
    <div text-center pt-40px pb-16px>
      <Icon name="pig" className='w-64px h-68px' />
      <h1 text-32px text="#581608" font-bold>时刻存钱罐</h1>
    </div>
    <form j-form onSubmit={onSubmit} text="#581608">
      <span text-gray text-13px>测试邮箱: sk@sk.com</span>
      <Input label='邮箱' value={data.email} placeholder='请输入邮箱' type="text"
        onChange={value => setData({ email: value })} error={error.email?.[0]} />
      <span text-gray text-13px>测试验证码: 123456</span>
      <Input label='验证码' value={data.code} placeholder='请输入 6 位数字' type='sms_code'
        onChange={value => setData({ code: value })} error={error.code?.[0]}
        request={sendCode} />
      <div mt-100px>
        <button j-btn type="submit">登录</button>
      </div>
    </form>
  </div>)
}
