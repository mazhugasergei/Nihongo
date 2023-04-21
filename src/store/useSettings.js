import { create } from "zustand"

const useSettings = create(set => ({
  furigana: true,
  furiganaToggle: () => set(state => ({ furigana: !state.furigana }))
}))

export default useSettings