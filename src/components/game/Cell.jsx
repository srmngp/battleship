export const Cell = ({ children, updateBoard }) => {

  return (
    <div onClick={updateBoard} className='square'>
      {children}
    </div>
  )

}
