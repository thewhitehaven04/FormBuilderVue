import { ref, watch } from 'vue'

export function useFetcher<T>(func: () => Promise<T>, reactiveDeps: unknown[] | (() => unknown)) {
    const data = ref<T | null>(null)
    const hasError = ref(false)
    const isPending = ref(true)
    const isFetching = ref(false)

    const refetch = async () => {
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

    watch(reactiveDeps, () => refetch(), { immediate: true })

    return { data, hasError, isPending, isFetching, refetch }
}
