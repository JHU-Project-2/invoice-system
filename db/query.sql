SELECT
    `company`.`id`,
    `company`.`name`,
    `address`.`id` AS `address.id`,
    `address`.`address_1` AS `address.address_1`,
    `address`.`address_2` AS `address.address_2`,
    `address`.`city` AS `address.city`,
    `address`.`state` AS `address.state`
FROM
    `company` AS `company`
    LEFT OUTER JOIN `address` AS `address` ON `company`.`id` = `address`.`address_id`
WHERE
    `company`.`id` = '1';

SELECT
    `project`.`id`,
    `project`.`title`,
    `project`.`type`,
    `project`.`price`,
    `project`.`due_date`,
    `invoices`.`id` AS `invoices.id`,
    `invoices`.`name` AS `invoices.name`
FROM
    `project` AS `project`
    LEFT OUTER JOIN `invoice` AS `invoices` ON `project`.`id` = `invoices`.`project_id`
WHERE
    `project`.`id` = '1';

SELECT
    `invoice`.`id`,
    `invoice`.`name`,
    `items`.`id` AS `items.id`,
    `items`.`description` AS `items.description`,
    `items`.`units` AS `items.units`,
    `items`.`unit_price` AS `items.unit_price`
FROM
    `invoice` AS `invoice`
    LEFT OUTER JOIN `item` AS `items` ON `invoice`.`id` = `items`.`invoice_id`
WHERE
    `invoice`.`id` = '6';