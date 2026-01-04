import suggestions from "@/data/DirectSuggestions.json"


export function getDirectSuggestions(count = 3) {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}
