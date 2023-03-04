import type { FormEventHandler } from 'react'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Input } from '../../components/Input'
import { hasError, validate } from '../../lib/validate'
import { useCreateTagStore } from '../../stores/useCreateTagStore'

type Props = {
  type: 'create' | 'edit'
}

export const TagForm: React.FC<Props> = (props) => {
  const { type } = props
  const { data, error, setData, setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()
  useEffect(() => {
    if (type !== 'create') { return }
    const kind = searchParams.get('kind')
    if (!kind) {
      throw new Error('kind is required')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('kind must be expenses or income')
    }
    setData({ kind })
  }, [searchParams])
  const params = useParams()
  useEffect(() => {
    if (type !== 'edit') { return }
    const id = params.id
    if (!id) {
      throw new Error('No id')
    }
    // ajax
  }, [])
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: 'kind is required' },
      { key: 'name', type: 'required', message: 'Please input tag name' },
      { key: 'name', type: 'length', max: 4, message: 'Tag name too long' },
      { key: 'sign', type: 'required', message: 'Please input sign' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      // ajax
    }
  }
  return (
    <form onSubmit={onSubmit} p-16px p-t-32px flex flex-col gap-y-8px>
      <Input label='Tag name' error={error.name?.[0]}
        value={data.name} onChange={name => setData({ name })} />
      <Input type='emoji' label={<span>Tag <span text-24px>{data.sign}</span></span>}
        value={data.sign} onChange={sign => setData({ sign })}
        error={error.sign?.[0]} />
      <p text-center p-b-24px>Press and hold the tag to edit when bookkeeping</p>
      <div>
        <button j-btn>Confirm</button>
      </div>
    </form>
  )
}
