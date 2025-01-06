/*global QUnit*/
import Controller from "at/clouddna/splitapp/controller/Main.controller";
import { MessageType } from "sap/ui/core/library";

QUnit.module("Available Seats State");

type TestData = { seatsMax: int, seatsOcc: int, assert: Assert, expected: MessageType };

function avSeatsTestCase (oTestData: TestData){
	//Arrange
	const oAppController = new Controller("Main");

	//Act
	const sState = oAppController.stateAvSeats(oTestData.seatsMax, oTestData.seatsOcc);

	//Assert
	oTestData.assert.strictEqual(sState, oTestData.expected);

	//Cleanup (optional)
	oAppController.destroy();
}

QUnit.test("Should format the seats with available seats lower than 16 to Error", function (assert: Assert) {
	avSeatsTestCase({ seatsMax: 16, seatsOcc: 1, assert: assert, expected: MessageType.Error });
});

QUnit.test("Should format the seats with available seats higher than 15 to Warning", function (assert: Assert) {
	avSeatsTestCase({ seatsMax: 17, seatsOcc: 1, assert: assert, expected: MessageType.Warning });
});

QUnit.test("Should format the seats with available seats lower than 26 to Warning", function (assert: Assert) {
	avSeatsTestCase({ seatsMax: 26, seatsOcc: 1, assert: assert, expected: MessageType.Warning });
});

QUnit.test("Should format the seats with available seats higher than 25 to Success", function (assert: Assert) {
	avSeatsTestCase({ seatsMax: 27, seatsOcc: 1, assert: assert, expected: MessageType.Success });
});