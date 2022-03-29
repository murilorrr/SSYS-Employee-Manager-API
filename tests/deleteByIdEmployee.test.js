const chai = require("chai");
const chaiHttp = require("chai-http");
const { generateNEmployees } = require('../utils');
const { Employee } = require("../src/database/models");

chai.use(chaiHttp);

const server = require('../src/server/app');
const { it } = require('mocha');

const { expect } = chai;

const defaultEmployee = {
  name: 'Anakin Skywalker',
  department: 'Architecture',
  email: 'skywalker@ssys.com.br',
  password: 'beStrong',
  salary: '4000.00',
  birth_date: '01-01-1983'
};


describe("DELETE /employees/:id", () => {
  const randomNumberOfEmployeesMaxEleven = Math.ceil(Math.random() * 10);
  const employees = generateNEmployees(randomNumberOfEmployeesMaxEleven);
  employees.push(defaultEmployee);

  before(async () => {
    Employee.destroy({ where: {} });
    await Promise.all(
      employees.map((employee) =>
        chai
          .request(server)
          .post('/employees')
          .set('content-type', 'application/json')
          .send(employee)
      )
    );
  });

  after(() => {
    Employee.destroy({ where: {}});
  })

  describe("Será validado que é possível deletar um employee com sucesso", () => {
    it("deletando um employee ", async () => {
      const loginRequest = await chai.request(server).post('/employees/login').send(defaultEmployee);
      const token = loginRequest.body.token;

      const responseAll = await chai.request(server).get('/employees').set('authorization', token);
      const SUT = responseAll.body.find((employee) => employee.email == employees[0].email);
      const response = await chai.request(server).delete(`/employees/${SUT.id}`).set('authorization', token);

      expect(response.status).to.be.equal(204);
      expect(response.body).to.be.deep.equal({});
    });
  });

  describe("Será validado que não é possível deletar um usuário de qualquer quando", () => {
    let token;

    before((done) => {
      chai
        .request(server)
        .post("/employees/login")
        .send(defaultEmployee)
        .end((err, res) => {
          if (err) done(err);
          token = res.body.token;
          done();
        });
    });

    describe("O usuário não Existir", () => {
      it("Retorna Not Found", (done) => {

        chai
          .request(server)
          .delete("/employees/9999999999")
          .set("authorization", token)
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.be.equal(404);
            expect(res.body).to.be.deep.equal({
              message: "User not exists",
            });
            done();
          });
      });
    });

    describe("Problemas com token", () => {
      let tokenFail;

      before((done) => {
        chai
          .request(server)
          .post("/employees/login")
          .send(defaultEmployee)
          .end((err, res) => {
            if (err) done(err);
            tokenFail = res.body.token;
            done();
          });
      });

      it("Será validado que o token não existe", (done) => {
        chai
          .request(server)
          .delete("/employees/999")
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.be.equal(401);
            expect(res.body).to.be.deep.equal({ message: "Token not found" });
            done();
          });
      });

      it("Será validado que o token não é valido", (done) => {
        chai
          .request(server)
          .delete("/employees/999")
          .set("authorization", `${tokenFail} 11`)
          .end((err, res) => {
            if (err) done(err);
            expect(res.status).to.be.equal(401);
            expect(res.body).to.be.deep.equal({
              message: "Expired or invalid token",
            });
            done();
          });
      });
    });
  });
});
