const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li key={note.id} className="Note">
      <span className="Note__body">{note.content}</span>
      <div className="Note__toggle">
        {label.toString('make Important') === 'make important' ? (
          <button
            className="Note__toggle Note__toggle--notimportant"
            onClick={toggleImportance}
          >
            {label}
          </button>
        ) : (
          <button
            className="Note__toggle Note__toggle--important"
            onClick={toggleImportance}
          >
            {label}
          </button>
        )}
      </div>
    </li>
  )
}

export default Note
