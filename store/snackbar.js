export const state = () => ({
  content: '',
  color: '',
  timeout: 4000
});

export const mutations = {
  showMessage (state, { content, color, timeout }) {
    state.content = content;
    state.color = color || 'info';
    state.timeout = timeout || 4000;
  }
};
