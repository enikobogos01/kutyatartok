<?php
class Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "kutyatartokwebaruhaza";
    private $connection;

    public function __construct() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die("Hiba a kapcsolódás során: " . $this->connection->connect_error);
        }
    }

    public function getConnection() {
        return $this->connection;
    }
    
}
?>
