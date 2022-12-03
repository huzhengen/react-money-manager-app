import type { FormEventHandler } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const { data, setData } = useSignInStore()
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
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
        <span j-form-label>Email</span>
        <input j-input-text type="text" placeholder='Email'
          value={data.email} onChange={e => setData({ email: e.target.value })} />
      </div>
      <div>
        <span j-form-label>Code</span>
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
