import type { AxiosError } from 'axios'
import type { FormEventHandler } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { Input } from '../../components/Input'
import { useAjax } from '../../lib/ajax'
import type { FormError } from '../../lib/validate'
import { hasError, validate } from '../../lib/validate'
import { useCreateTagStore } from '../../stores/useCreateTagStore'

type Props = {
  type: 'create' | 'edit'
}

export const TagForm: React.FC<Props> = (props) => {
  const { type } = props
  const { data, error, setData, setError } = useCreateTagStore()
  const [searchParams] = useSearchParams()
  const kind = searchParams.get('kind') ?? ''
  const { get, post, patch } = useAjax({ showLoading: true, handleError: true })
  const params = useParams()
  const id = params.id
  // revalidateIfStale = true: automatically revalidate even if there is stale data
  const { data: tag } = useSWR(id ? `/api/v1/tags/${id}` : null,
    async path =>
      (await get<Resource<Tag>>(path)).data.resource,
    { revalidateIfStale: false, revalidateOnFocus: false }
  )
  useEffect(() => {
    if (tag) {
      setData(tag)
    }
  }, [tag])

  useEffect(() => {
    if (type !== 'create') { return }
    if (!kind) {
      throw new Error('类型必填')
    }
    if (kind !== 'expenses' && kind !== 'income') {
      throw new Error('类型必须是 expenses 或 income')
    }
    setData({ kind })
  }, [searchParams])
  const nav = useNavigate()
  const onSubmitError = (error: AxiosError<{ errors: FormError<typeof data> }>) => {
    if (error.response) {
      const { status } = error.response
      if (status === 422) {
        const { errors } = error.response.data
        setError(errors)
      }
    }
    throw error
  }
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '记账类型必填' },
      { key: 'name', type: 'required', message: '请输入标签名' },
      { key: 'name', type: 'length', max: 4, message: '标签最长 4 个字符' },
      { key: 'sign', type: 'required', message: '请选择标签' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      const promise = type === 'create'
        ? post<Resource<Tag>>('/api/v1/tags', data)
        : patch<Resource<Tag>>(`/api/v1/tags/${id}`, data)
      const res = await promise.catch(onSubmitError)
      setData(res.data.resource)
      nav(`/items/new?kind=${encodeURIComponent(kind)}`)
    }
  }
  return (
    <form onSubmit={onSubmit} p-16px p-t-32px flex flex-col gap-y-8px text="#581608">
      <Input label='标签名' error={error.name?.[0]} type='text'
        value={data.name} onChange={name => setData({ name })} />
      <Input type='emoji' label={<span>标签 <span text-24px>{data.sign}</span></span>}
        value={data.sign} onChange={sign => setData({ sign })}
        error={error.sign?.[0]} />
      <p text-center p-b-24px text-14px>记账时长按标签可进行编辑</p>
      <div>
        <button j-btn>确认</button>
      </div>
    </form>
  )
}
