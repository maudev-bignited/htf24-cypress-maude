import {missionPage} from '../page-objects/missionPage';
import {missionData} from '../data-objects/missionData';
import {commonPage} from '../page-objects/commonPage';

describe('Start challenge', () => {
  let MURDER_CODE = '';
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.visit('/');
  });

  it('Click transmission', () => {
    cy.get(missionPage.actionButton, {timeout: 10000})
      .click();
  });

  it('Skip earth', () => {
    cy.get(commonPage.body)
      .click();
  });

  it('Get to information page', () => {
    cy.visitSecretPage('information');
  });

  it('Enter entity information', () => {
    cy.get(missionPage.entityInformation.name)
      .type('Arne + Maude');

    cy.get(missionPage.entityInformation.age)
      .type('24');

    cy.get(missionPage.entityInformation.species)
      .select('Zerg');

    cy.get(missionPage.entityInformation.planet)
      .type('Earth {enter}');
  });

  it('Collect code', () => {
    cy.visitSecretPage('collect-code');
    cy.get(missionPage.victim)
      .click(missionData.victim.xPosition,missionData.victim.yPosition);

    cy.get(missionPage.murderCode)
      .should('be.visible')
      .then(murderCode => {
        MURDER_CODE = murderCode.text();
      });
  });

  it('Go to gate', () => {
    cy.visitSecretPage('gate');
    cy.get(missionPage.gate.numpad).click();
    cy.get(missionPage.gate.numpadOpen).should('be.visible');

    // TODO: fix arbitrary wait
    cy.wait(1000);
  });

  it('Enter code', () => {
    cy.get(missionPage.gate.numpadScreen)
      .type(MURDER_CODE, {force: true});

    cy.get(missionPage.gate.enter)
      .click();

    cy.get(missionPage.gate.numpad)
      .should('not.be.visible');
  });

  it('Enter the dark room', () => {
    cy.get(commonPage.body).type('{upArrow}');
  });

  it('Meet the lady', () => {
    cy.visitSecretPage('the-lady');

    cy.get(commonPage.button)
      .contains('Yes')
      .click({force: true});

    cy.get(commonPage.p)
      .contains('lie')
      .within(() => {
        cy.get(commonPage.button)
          .contains('Yes')
          .click({force: true});
      });

    for (let i = 0; i < missionData.lady.firstAmountOfQuestions; i++) {
      cy.get(commonPage.button)
        .eq(0)
        .click({force: true});
    }
  });

  it('Scan meteor', () => {
    cy.visitSecretPage('scanner');

    cy.get(missionPage.meteor.floatingMeteor, {timeout: 20000})
      .should('be.visible')
      .click();

    cy.get(missionPage.meteor.scanButton)
      .should('contain', 'Press to scan')
      .trigger('mousedown');

    cy.get(missionPage.meteor.scanButton, { timeout: 10000})
      .should('not.exist');
  });

  it('Fix cure in experiment', () => {
    let CURRENT_READING = '';
    let WANTED_READING = '';
    cy.visit('/experiment', {failOnStatusCode: false});

    cy.get(missionPage.experiment.currentReading)
      .should('be.visible')
      .then(currentReading => {
        CURRENT_READING = currentReading.text();
        cy.get(missionPage.experiment.wantedReading)
          .should('be.visible')
          .then(wantedReading => {
            WANTED_READING = wantedReading.text();
            for (let i = 0; i < CURRENT_READING.length; i++) {
              let outcome = WANTED_READING[i] - CURRENT_READING[i];
              if (outcome < 0) {
                outcome = Math.abs(outcome);
                for (let j = 0; j < outcome; j++) {
                  cy.get(missionPage.experiment.arrowDown)
                    .eq(i)
                    .click({force: true});
                }
              } else {
                for (let j = 0; j < outcome; j++) {
                  cy.get(missionPage.experiment.arrowUp)
                    .eq(i)
                    .click({force: true});
                }
              }

            }
            cy.get(commonPage.body).type('{enter}');
          });
      });
  });

  it('Defeat the boss', () => {
    cy.visitSecretPage('boss');
    cy.get(missionPage.bossFight.boss).then(($boss) => {
      const xPositionBoss = $boss[0].getBoundingClientRect().x;

      cy.get(missionPage.bossFight.player).then(($player) => {
        const xPositionPlayer = $player[0].getBoundingClientRect().x;

        const xDifference = xPositionPlayer - xPositionBoss;

        if (xDifference !== 0) {
          const direction = xDifference > 0 ? '{leftarrow}' : '{rightarrow}';
          const steps = Math.abs(xDifference) / 40;

          for (let i = 0; i < steps; i++) {
            cy.get(commonPage.body).type(direction);
          }
        }
      });
    });

    cy.get(commonPage.body).click();
    for (let i = 0; i < 100; i++) {
      cy.get(commonPage.body).trigger('keydown', {
        key: ' '
      });
    }
  });

  it('We\'ve won and go back to the lady', () => {
    cy.visitSecretPage('won');

    for (let i = 0; i < missionData.lady.endAmountOfQuestions; i++) {
      cy.get(commonPage.button)
        .eq(0)
        .click({force: true});
    }
  });

  it('Showing our winning stats', () => {
    cy.contains('Mission completed');
  });
});