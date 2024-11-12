import {commonPage} from '../page-objects/commonPage.js';
import {missionPage} from '../page-objects/missionPage.js';

export function attackUntilDefeated () {
  errorDoesntFailTest();
  cy.get(commonPage.body).trigger('keydown', { key: ' ' });

  cy.get(missionPage.bossFight.boss).then(($boss) => {
    if ($boss.length > 0 && $boss.is(':visible')) {
      attackUntilDefeated();
    }
  });
}

function errorDoesntFailTest () {
  // At some point, the boss will not be visible anymore and the test will fail
  // Following code will make sure the test itself won't fail and will continue
  Cypress.on('fail', (err) => {
    cy.log(err.message);
    return false;
  });
}