interface Props {
  className?: string
}
export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
    <div className={className} bg="#5C33BE" text-white w="100%" pt-32px pb-44px
      px-16px>
      <h2 text-24px>User</h2>
      <div text="#CEA1FF">Sign In</div>
    </div>
  )
}
