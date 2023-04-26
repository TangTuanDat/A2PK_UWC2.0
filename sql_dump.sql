CREATE TABLE users (
  user_id INT PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role ENUM('Back Officer', 'Janitor', 'Collector') NOT NULL,
  is_available BOOLEAN DEFAULT true NOT NULL
);


CREATE TABLE vehicle (
  vehicle_id INT PRIMARY KEY NOT NULL,
  is_free BOOLEAN NOT NULL,
  fuel FLOAT NOT NULL,
  capacity FLOAT NOT NULL
);

CREATE TABLE troller (
  troller_id INT PRIMARY KEY NOT NULL,
  is_free BOOLEAN NOT NULL,
  capacity FLOAT NOT NULL
);

CREATE TABLE mcp (
  mcp_id INT PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  capacity FLOAT NOT NULL,
  used FLOAT NOT NULL,
  is_full BOOLEAN NOT NULL,
  INDEX location_idx (location)
);

CREATE TABLE task (
  task_id INT PRIMARY KEY NOT NULL,
  from_user_id INT NOT NULL,
  to_user_id INT NOT NULL,
  method ENUM('troller', 'vehicle') NOT NULL,
  curr_worker_location VARCHAR(50) NOT NULL,
  mcp_location VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  FOREIGN KEY (from_user_id) REFERENCES users(user_id),
  FOREIGN KEY (to_user_id) REFERENCES users(user_id),
  FOREIGN KEY (mcp_location) REFERENCES mcp(location)
);
