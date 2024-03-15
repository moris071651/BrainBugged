from datetime import datetime
from openai import OpenAI


client = OpenAI(
   api_key= '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',
)

#For you to change <3
idea_name = "TuneLink"
idea_desc = "Connecting musicians with venues. Our platform streamlines the process of booking gigs for independent artists while helping venues discover fresh talent. Say goodbye to endless searches and hello to the perfect match."
idea_help_req = "How do I make money from this idea?"

#Code for gpt - generate shorter description
#shortdescription - your var here
prompt = "Could you make this description shorter:\n"
prompt += idea_desc
response = client.chat.completions.create(
model="gpt-3.5-turbo-0125",
messages=[
    {
    "role": "user",
    "content": [
        {"type": "text", "text": prompt},
    ],
    }
],
max_tokens=700,
)
shortdescription = response.choices[0].message.content
print(shortdescription)

print("[GPT answered]")  

#Code for gpt - generate the 4 pay attention to
#payattentionto - your list with 4 elements here
prompt = "Could you 4 devided by a new line detailed punkts what could go wrong with this idea and nothing more:\n"
prompt += idea_desc
response = client.chat.completions.create(
model="gpt-3.5-turbo-0125",
messages=[
    {
    "role": "user",
    "content": [
        {"type": "text", "text": prompt},
    ],
    }
],
max_tokens=700,
)
payattentionto = response.choices[0].message.content.split("\n")
print(payattentionto)

print("[GPT answered]")  

#Code for gpt - help with something
#helpmepls - your var is here
prompt = "Could you create text about this project:\n"
prompt += idea_desc
prompt += "I am having trouble with:\n"
prompt += idea_help_req
response = client.chat.completions.create(
model="gpt-3.5-turbo-0125",
messages=[
    {
    "role": "user",
    "content": [
        {"type": "text", "text": prompt},
    ],
    }
],
max_tokens=700,
)
helpmepls = response.choices[0].message.content
print(helpmepls)

print("[GPT answered]")  

