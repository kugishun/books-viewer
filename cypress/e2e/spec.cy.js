describe('My First Test', () => {
  it('Input test', () => {
      cy.visit('http://localhost:3000/Page1')  // または http://localhost:3000 など

      cy.get('[data-cy="input-text"]').clear().type('ABC')  // ABC と入力する
      cy.get('[data-cy="input-button"]').click()  // ボタンを押す
      cy.get('[data-cy="result"]').should('have.text', 'ABC')  // 出力をチェックする
      cy.get('[data-cy="input-text"]').should('have.value', 'ABC')  // input タグの場合
  })
})
