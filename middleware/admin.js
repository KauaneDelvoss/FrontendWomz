export default function ({ store, redirect }) {
    if (!store.state.auth.user.staff) {
      return redirect('/loginWormz')
    }
  }