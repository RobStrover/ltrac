ALTER TABLE `job` ADD `job_payment_terms_denomination` ENUM('days','months') NOT NULL DEFAULT 'days' AFTER `job_payment_terms`;

ALTER TABLE `job` ADD `job_payment_terms_number` INT(10) NOT NULL DEFAULT '0' AFTER `job_payment_terms`;

ALTER TABLE `job` DROP `job_payment_terms_number`;