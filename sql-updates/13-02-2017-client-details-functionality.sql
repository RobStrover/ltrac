ALTER TABLE `job` ADD `job_finance_contact_id` INT(11) NULL DEFAULT NULL AFTER `job_name`;

ALTER TABLE `job` ADD `job_company_id` INT(11) NULL DEFAULT NULL AFTER `job_name`; 

ALTER TABLE `contact` ADD `contact_deleted` TINYINT NOT NULL DEFAULT '0' AFTER `contact_contact_numbers`;

ALTER TABLE `company` ADD `company_deleted` TINYINT NOT NULL DEFAULT '0' AFTER `company_telephone_number`; 