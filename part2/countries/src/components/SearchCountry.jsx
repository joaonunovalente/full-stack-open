/**
 * Country Search Component.
 *
 * This component allows users to search for countries using a text input field.
 * The input value is controlled by the `input` state and updated via the `setInput` function.
 */

const SearchCountry = ({ input, setInput }) => {
  return (
    <div>
      <p>
        Find countries:&nbsp;
        <input
          type="text"
          value={input}
          placeholder='E.g. Portugal'
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
    </div>

  )
}

export default SearchCountry