import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const SignInPage: React.FC = () => {
  return (<div>
    <Gradient>
      <TopNav title='Sign In' icon={<Icon name="back" onClick={() => { }} />} />
    </Gradient>
    <div text-center pt-40px pb-16px>
      <Icon name="logo" className='w-64px h-68px' />
      <h1 text-32px text="#7878FF" font-bold>Money Manager</h1>
    </div>
    <form j-form>
      <div>
        <span j-form-label>Email</span>
        <input j-input-text type="text" placeholder='Email' />
      </div>
      <div>
        <span j-form-label>Code</span>
        <div flex gap-x-16px>
          <input j-input-text type="text" placeholder='Enter 6-digit code' />
          <button j-btn>Send Code</button>
        </div>
      </div>
      <div mt-100px>
        <button j-btn type="submit">Sign In</button>
      </div>
    </form>
  </div>)
}
