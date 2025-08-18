import { ref } from 'vue'

export function fetcher<ResponseValue>(func: () => Promise<ResponseValue>){
    const data = ref<T | null>(data)
    const hasError = ref(false)
    const isPending = ref(true)
    const isFetching = ref(false)

    const query = async () => {
      try {
        isFetching.value = true
        return await func();
      } catch (error) {
        hasError.value = true
      } finally {
        isPending.value = false
        isFetching.value = false
      }
    }

    return { data, hasError, isPending, isFetching, query }
}
