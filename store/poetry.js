export const state = () => ({
  dynastys: [
    '先秦',
    '汉',
    '魏晋',
    '南北朝',
    '隋',
    '唐',
    '宋',
    '辽',
    '金',
    '元',
    '明',
    '清',
    '汇总'
  ],
  rawCharsSummary: null
})

export const mutations = {
  updateSummary(state, obj) {
    state.rawCharsSummary = obj
  }
}
