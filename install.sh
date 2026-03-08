#!/bin/bash
echo "Installing Pro Chess Server"
composer install
mysql -u root < sql/schema.sql
echo "Installation complete"