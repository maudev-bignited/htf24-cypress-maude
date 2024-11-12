import {missionPage} from '../page-objects/missionPage.js';

export function adjustReading (index, currentLevel, targetLevel) {
  const difference = targetLevel - currentLevel;
  const arrowSelector = difference < 0 ? missionPage.experiment.arrowDown : missionPage.experiment.arrowUp;
  const steps = Math.abs(difference);

  for (let i = 0; i < steps; i++) {
    cy.get(arrowSelector).eq(index).click({force: true});
  }
}