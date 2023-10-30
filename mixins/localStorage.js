export const saveDataToLocalStorage = (key, data) => {
    return new Promise((resolve) => {
        localStorage.setItem(
          key,
          JSON.stringify(data)
        )
        resolve()
      })
}

export const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

