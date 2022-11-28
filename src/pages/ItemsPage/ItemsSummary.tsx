export const ItemsSummary: React.FC = () => {
  return (
    <ol bg="#252A43" flex justify-between items-center m-16px rounded-8px py-12px px-16px
      children-px-24px text-center>
      <li text="#FE7275">
        <div>Income</div>
        <div>1000</div>
      </li>
      <li text="#53A867">
        <div>Expenses</div>
        <div>1000</div>
      </li>
      <li text-white>
        <div>Balance</div>
        <div>1000</div>
      </li>
    </ol>
  )
}
