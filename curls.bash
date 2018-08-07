curl -X PUT "localhost:9200/books?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "_doc": {
      "properties": {
        "title": { 
          "type": "text",
          "fields": {
            "english": { 
              "type":     "text",
              "analyzer": "english"
            }
          }
        }
      }
    }
  }
}
'

curl -X GET "localhost:9200/_search?pretty" -H 'Content-Type: application/json' -d'
{
    "query" : {
        "fuzzy" : { "subjects" : "time" }
    }
}
'

curl -X GET "localhost:9200/books/_search?pretty" -H 'Content-Type: application/json' -d'
{
   "query":{
      "query_string":{
         "query":"\"die\"" 
      }
   }
}
'
