Feature: Book a seat in the movie app
    Scenario: Should book one seat
        Given user is on "/index.php" page
        When user choose date
        When user choose time
        When user choose third seat
        When user presses a booking button
        Then valid booking "Вы выбрали билеты:"

    Scenario: Should book two seats
        Given user is on "/index.php" page
        When user choose date
        When user choose time
        When user choose first seat
        When user choose second seat
        When user presses a booking button
        Then valid booking "Вы выбрали билеты:"

    Scenario: Should try to book unavailable ticket, but unsuccessfully
        Given user is on "/index.php" page
        When user choose date
        When user choose time
        When user presses a booking button
        Then button for booking is inactive "true"
        