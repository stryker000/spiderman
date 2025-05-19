<?php
/* -------------------------------------------
 *  Simple logout handler – destroys session and
 *  returns the user to the home page.
 * ------------------------------------------- */

session_start();      // resume session to access it
session_unset();      // clear all session variables
session_destroy();    // end the session completely

// Redirect to the landing page
header("Location: index.php");
exit;
