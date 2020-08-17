export const state = () => ({
  compName: '',
  compProps: {}
});

export const mutations = {
  show (state, { compName, compProps }) {
    state.compName = compName;
    state.compProps = compProps;
  },

  hide () {}
};
