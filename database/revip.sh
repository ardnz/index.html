# !/bin/bash

# color(bold)
red='\e[1;31m'
green='\e[1;32m'
yellow='\e[1;33m'
blue='\e[1;34m'
magenta='\e[1;35m'
cyan='\e[1;36m'
white='\e[1;37m'

# create file
touch list_url.tmp list_rev.tmp list_failed.txt list_reverse.txt

# banner
echo -e '''
Hackertarget Unlimited Reverse IPs \e[1;31m<3\e[1;37m
Created by \e[1;31m:\e[1;37m LazyBoy \e[1;31m-\e[1;37m JavaGhost Team
 \e[1;33m* \e[1;32mUse tor
 \e[1;33m* \e[1;32mMulti thread
 \e[1;33m* \e[1;32mAuto delete subdo\e[1;37m
'''

# asking
read -p $'\e[1;37m[ \e[1;32m? \e[1;37m] Input list url \e[1;31m:\e[1;32m ' ask_url
if [[ ! -e $ask_url ]]; then
	echo -e "${white}[ ${red}! ${white}] Error list ${green}${ask_url}${white} not found in your directory"
	exit
else
	cat $ask_url | cut -d "/" -f3 > list_url.tmp
	echo -e "${white}[ ${green}+ ${white}] Starting reverse Ips from ${red}: ${green}$(< list_url.tmp wc -l) ${white}list"
fi

# start reverse IPs
function rev_ip(){
	start=$(curl --socks5-hostname localhost:9050 -s "https://api.hackertarget.com/reverseiplookup/?q=${list_url}")
	if [[ $start =~ "API count exceeded - Increase Quota with Membership" || $start =~ "429 Too Many Requests" ]]; then
		echo -e " ${white}[ ${red}- ${white}] ${yellow}${list_url} ${blue}->${red} Failed reverse IPs${white}"
		echo $list_url >> list_failed.txt
		killall -HUP tor
	elif [[ $start =~ "No DNS A records found for" ]]; then
		echo -e " ${white}[ ${red}- ${white}] ${yellow}${list_url} ${blue}->${red} No DNS A records found${white}"
		killall -HUP tor
	elif [[ $start =~ "error check your search parameter" ]]; then
		echo -e " ${white}[ ${red}! ${white}] ${yellow}${list_url} ${blue}->${red} Error reverse IPs - Try manual for show whats wrong${white}"
		killall -HUP tor
	else
		echo -e " ${white}[ ${green}+ ${white}] ${yellow}${list_url} ${blue}->${green} Success reverse IPs${white}"
		echo $start | tr " " "\n" | awk '{print "\033[1;34m  - \033[0m"$0}'
		echo $start | tr " " "\n" >> list_rev.tmp
		killall -HUP tor
	fi
}


# multi thread
for list_url in $(cat list_url.tmp); do
	rev_ip "$list_url" &
	while (( $(jobs | wc -l) >= 200 )); do
		sleep 0.1s
		jobs > /dev/null
	done
done
wait

# removing subdomain
array_subdo=("cpanel" "webdisk" "mail" "cpcontacts" "autodiscover" "contact" "webmail" "contacts" "ns1" "ns2" "ns3" "imap" "whm" "cdn" "cdn-0" "cdn-1" "cdn-2" "cdn-3" "cpcalendars" "hostmaster" "cp" "cp1" "admin")
for list_subdo in ${array_subdo[@]}; do
	cat list_rev.tmp | sed "s/^.*$list_subdo.*//g;s/ns[0-9]//g" | sort -u > list_reverse.txt
done
echo -e "${white}[ ${green}DONE ${white}] Total results : $(< list_reverse.txt wc -l)"

rm *.tmp*
