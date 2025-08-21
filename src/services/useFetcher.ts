import { ref } from 'vue'

export function useFetcher<T>(func: () => Promise<T>) {
    const data = ref<T | null>(null)
    const hasError = ref(false)
    const isPending = ref(true)
    const isFetching = ref(false)

    const query = async () => {
        try {
            isFetching.value = true
            data.value = await func()
        } catch {
            hasError.value = true
        } finally {
            isPending.value = false
            isFetching.value = false
        }
    }

    return { data, hasError, isPending, isFetching, query }
}
