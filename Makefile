.PHONY: \
	clean \
	help-dialog \
	publish-tags

#
# All build steps that include repeatable processes based on dependencies
# should go here instead of scripts.
#

clean:
	rm help_dialog_collapsed.html

help-dialog: help_dialog_collapsed.html

# Old version without collapsible headers
# help_dialog.html: Help.md assets/templates/help_dialog.html
# 	echo "$$(npx marked Help.md)" | sed -e '/__CONTENT__/{r /dev/stdin' -e 'd;}' \
# 		assets/templates/help_dialog.html > help_dialog.html

# New version, adds collapsible headers
# replaces h3 headers with buttons and content below in a div to make collapsible headers
help_dialog_collapsed.html: Help.md assets/templates/help_dialog_collapsed.html
	echo "$$(npx marked Help.md | sed 's/<a href/<a target=\"_blank\" href/g') </div>" | sed 's/Pricing data tracks the latest discounts from AWS.<\/p>/Pricing data tracks the latest discounts from AWS.<\/p>\n<p><button onclick="openFormulaBuilder()">Open Formula Builder<\/button><\/p>/' | sed -e '/__CONTENT__/{r /dev/stdin' -e 'd;}' \
	assets/templates/help_dialog_collapsed.html | \
	sed -E 's/<h3([^>]*)>/<\/div><button type="button" class="collapsible">/g' | \
	sed -E 's/<\/h3>/<\/button>\n<div class="content">/g' | \
	sed '1,/<\/div><button/ s/<\/div><button/<button/' \
	> help_dialog_collapsed.html

publish-tags:
	git push --tags origin
