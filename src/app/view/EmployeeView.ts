import Employee from '../model/Employee';

export default {
  Render(employee: Employee) {
    return {
      name: employee.name,
      level: employee.level_authorization,
      user: employee.user_name
    }
  },
  renderMany(employee: Employee[]) {
    return employee.map((employee) => this.Render(employee));
  }
}