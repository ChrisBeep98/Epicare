import re

page_path = 'design-system-app/src/app/design-system/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    '"Artisanal Coffee"': '"GO AMS Portal"',
    '"Mastering Craft"': '"Agent Dashboard"',
    '"Heritage"': '"Sales Performance"',
    '"A Legacy"': '"Client Portfolio"',
    '"Our Origins"': '"Commission Tracking"',
    '"The Terroir"': '"Active Policies"',
    '"Espresso"': '"Lead Generation"',
    '"Tasting Notes"': '"Monthly Targets"',
    '"Roasted"': '"Approved"',
    '"Aroma Profile"': '"Policy ID #4092"',
    '"Premium Selection"': '"AGENT OVERVIEW"',
    '"A smooth, balanced cup that reflects the rich volcanic soils."': '"Manage your insurance portfolio, track daily sales metrics, and connect with your high-value clients."',
    '"This is the largest body text, used for premium reading experiences."': '"Your sales performance this quarter has exceeded targets by 15%, maintaining a strong retention rate across all premium insurance packages."',
    '"This is the largest body text, with a lighter weight."': '"Review the latest policy updates and ensure all client documentation is properly submitted for final underwriting approval."',
    '"Extra large body text, providing excellent legibility."': '"Please review the attached life insurance policy details before sending the digital signature request to the client."',
    '"Large body text, offering a comfortable reading rhythm."': '"The dashboard provides a real-time overview of your active health and auto policies, including pending renewals."',
    '"Large body text, with a lighter, elegant weight."': '"Agent commissions are automatically calculated at the end of each billing cycle based on successfully bound policies."',
    '"Medium body text, the standard for article paragraphs."': '"Select a specific agent from the directory to view their historical conversion rates and overall client satisfaction scores."',
    '"Our beans are carefully hand-picked by local farmers who have dedicated generations."': '"The GO AMS platform centralizes all lead management, allowing agents to instantly follow up on new quote requests and process applications."',
    '"Our beans are carefully hand-picked, shown in light weight."': '"Ensure that the beneficiary information is accurate and fully verified before submitting the final contract."',
    '"Small body text, used for secondary descriptions and minor details."': '"This policy requires an additional medical examination before the underwriting department can issue a final approval."',
    '"Small body text in a delicate light weight."': '"The premium calculation includes a standard multi-policy discount applied to the client’s home and auto bundle."',
    '"Extra small body text, for dense information areas."': '"Terms and conditions apply. Policy cancellation requires a 30-day prior written notice."',
    '"Add to Cart"': '"Generate Quote"',
    '"$24.00 USD"': '"$14,500.00 YTD"',
    '"Footnotes, timestamps, and tiny details."': '"Last updated today at 14:30 EST. Secured via 256-bit encryption."'
}

for old_text, new_text in replacements.items():
    content = content.replace(old_text, new_text)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated typography example texts to GO AMS insurance context.")
