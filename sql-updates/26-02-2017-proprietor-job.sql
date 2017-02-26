ALTER TABLE `job` CHANGE `job_contact_id` `job_contact_ids` VARCHAR(255) NULL DEFAULT NULL;

ALTER TABLE `job`
  DROP `job_finance_contact_id`;

ALTER TABLE `job` CHANGE `job_company_id` `job_proprietor_id` INT(11) NULL DEFAULT NULL;