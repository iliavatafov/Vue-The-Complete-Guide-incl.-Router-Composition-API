export default {
  setBreadcrumbs(context, breadcrumbs) {
    context.commit("set", breadcrumbs);
  },
  pushBreadcrumb(context, breadcrumb) {
    context.commit("push", breadcrumb);
  },
  popBreadcrumb(context) {
    context.commit("pop");
  },
  replaceBreadcrumb(context, payload) {
    context.commit("replace", payload);
  },
  emptyBreadcrumb(context) {
    context.commit("empty");
  },
};
