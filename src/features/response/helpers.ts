export function formatTimer(time: number) {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
}